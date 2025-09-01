type OnTrackCallback = (stream: MediaStream) => void;
type OnIceCandidateCallback = (candidate: RTCIceCandidateInit) => void;

export class WebRTCManager {
  private pc: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private onTrackCb: OnTrackCallback | null = null;
  private onIceCandidateCb: OnIceCandidateCallback | null = null;

  constructor(
    private readonly config: RTCConfiguration = {
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    },
  ) {}

  public init(): RTCPeerConnection {
    if (this.pc) this.close();

    const pc = new RTCPeerConnection(this.config);

    pc.ontrack = (event: RTCTrackEvent) => {
      const stream = event.streams[0] ?? new MediaStream([event.track]);
      this.onTrackCb?.(stream);
    };

    pc.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        this.onIceCandidateCb?.(event.candidate.toJSON());
      }
    };

    this.pc = pc;
    return pc;
  }

  public close(): void {
    if (!this.pc) return;

    this.pc.getSenders().forEach((sender) => {
      sender.replaceTrack(null).catch(() => {});
    });

    this.pc.close();
    this.pc = null;
  }

  public setLocalStream(stream: MediaStream | null): void {
    this.localStream = stream;
    if (stream && this.pc && this.pc.signalingState !== 'closed') {
      this.addOrReplaceLocalTracks(stream);
    }
  }

  private addOrReplaceLocalTracks(stream: MediaStream): void {
    const pc = this.pc;
    if (!pc || pc.signalingState === 'closed') return;

    const senders = pc.getSenders();

    stream.getTracks().forEach((track) => {
      const existingSender = senders.find((s) => s.track?.kind === track.kind);

      if (existingSender) {
        if (existingSender.track !== track) {
          existingSender.replaceTrack(track).catch(() => {});
        }
      } else {
        pc.addTrack(track, stream);
      }
    });
  }

  private ensureProperTransceivers(): void {
    if (!this.pc || this.pc.signalingState === 'closed') return;

    const videoSender = this.pc.getSenders().find((s) => s.track?.kind === 'video');
    const audioSender = this.pc.getSenders().find((s) => s.track?.kind === 'audio');

    if (!videoSender) {
      const videoTransceiver = this.pc.getTransceivers().find((t) => t.sender.track?.kind === 'video');
      if (!videoTransceiver) {
        this.pc.addTransceiver('video', { direction: 'recvonly' });
      }
    }

    if (!audioSender) {
      const audioTransceiver = this.pc.getTransceivers().find((t) => t.sender.track?.kind === 'audio');
      if (!audioTransceiver) {
        this.pc.addTransceiver('audio', { direction: 'recvonly' });
      }
    }
  }

  public onTrack(cb: OnTrackCallback): void {
    this.onTrackCb = cb;
  }

  public onIceCandidate(cb: OnIceCandidateCallback): void {
    this.onIceCandidateCb = cb;
  }

  public async handleOffer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit | null> {
    if (!this.pc) this.init();
    if (!this.pc) return null;

    try {
      await this.pc.setRemoteDescription(offer);

      if (this.localStream) {
        this.addOrReplaceLocalTracks(this.localStream);
      }

      this.ensureProperTransceivers();

      const answer = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answer);

      return this.pc.localDescription?.toJSON() ?? null;
    } catch {
      return null;
    }
  }

  public async handleAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
    if (!this.pc) return;
    await this.pc.setRemoteDescription(answer);
  }

  public async addIceCandidate(candidate: RTCIceCandidateInit): Promise<void> {
    if (!this.pc) return;
    await this.pc.addIceCandidate(candidate);
  }
}
