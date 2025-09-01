type OnTrackCallback = (stream: MediaStream) => void;
type OnIceCandidateCallback = (candidate: RTCIceCandidateInit) => void;

export class WebRTCManager {
  private pc: RTCPeerConnection;
  private localStream: MediaStream | null = null;
  private onTrackCb: OnTrackCallback | null = null;
  private onIceCandidateCb: OnIceCandidateCallback | null = null;

  constructor(
    private readonly config: RTCConfiguration = {
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    },
  ) {
    this.pc = new RTCPeerConnection(this.config);
    this.setupListeners();
  }

  private setupListeners() {
    this.pc.ontrack = (event: RTCTrackEvent) => {
      const stream = event.streams[0] || new MediaStream([event.track]);
      this.onTrackCb?.(stream);
    };

    this.pc.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        this.onIceCandidateCb?.(event.candidate.toJSON());
      }
    };
  }

  public close() {
    this.pc.getSenders().forEach((s) => s.track && s.replaceTrack(null));
    this.pc.close();
  }

  public setLocalStream(stream: MediaStream) {
    this.localStream = stream;
    if (!this.pc || this.pc.signalingState === 'closed') return;

    const existingSenders = this.pc.getSenders();
    stream.getTracks().forEach((track) => {
      const sender = existingSenders.find((s) => s.track?.kind === track.kind);
      if (sender) {
        sender.replaceTrack(track);
      } else {
        this.pc.addTrack(track, stream);
      }
    });
  }

  public onTrack(cb: OnTrackCallback) {
    this.onTrackCb = cb;
  }

  public onIceCandidate(cb: OnIceCandidateCallback) {
    this.onIceCandidateCb = cb;
  }

  public async handleOffer(offer: RTCSessionDescriptionInit) {
    await this.pc.setRemoteDescription(offer);
    if (this.localStream) this.setLocalStream(this.localStream);
    const answer = await this.pc.createAnswer();
    await this.pc.setLocalDescription(answer);
    return this.pc.localDescription?.toJSON() ?? null;
  }

  public async handleAnswer(answer: RTCSessionDescriptionInit) {
    await this.pc.setRemoteDescription(answer);
  }

  public async addIceCandidate(candidate: RTCIceCandidateInit) {
    await this.pc.addIceCandidate(candidate);
  }
}
