import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const VoiceRecorder = ({ voiceData, onVoiceUpdate }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(voiceData?.audioBlob || null);
  const [selectedMusic, setSelectedMusic] = useState(voiceData?.backgroundMusic || 'none');
  const [volume, setVolume] = useState(voiceData?.volume || 80);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  const backgroundMusicOptions = [
    { value: 'none', label: 'No Background Music' },
    { value: 'romantic-piano', label: 'Romantic Piano' },
    { value: 'soft-strings', label: 'Soft Strings' },
    { value: 'acoustic-guitar', label: 'Acoustic Guitar' },
    { value: 'gentle-harp', label: 'Gentle Harp' },
    { value: 'nature-sounds', label: 'Nature Sounds' },
    { value: 'rain-ambience', label: 'Rain Ambience' }
  ];

  useEffect(() => {
    return () => {
      if (timerRef?.current) {
        clearInterval(timerRef?.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef?.current?.push(event?.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        onVoiceUpdate({
          audioBlob,
          backgroundMusic: selectedMusic,
          volume,
          duration: recordingTime
        });
      };

      mediaRecorderRef?.current?.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef?.current && isRecording) {
      mediaRecorderRef?.current?.stop();
      mediaRecorderRef?.current?.stream?.getTracks()?.forEach(track => track?.stop());
      setIsRecording(false);
      setIsPaused(false);
      clearInterval(timerRef?.current);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef?.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef?.current?.resume();
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef?.current?.pause();
        clearInterval(timerRef?.current);
      }
      setIsPaused(!isPaused);
    }
  };

  const playRecording = () => {
    if (audioBlob && audioRef?.current) {
      if (isPlaying) {
        audioRef?.current?.pause();
        setIsPlaying(false);
      } else {
        const audioUrl = URL.createObjectURL(audioBlob);
        audioRef.current.src = audioUrl;
        audioRef?.current?.play();
        setIsPlaying(true);
        
        audioRef.current.onended = () => {
          setIsPlaying(false);
        };
      }
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    setIsPlaying(false);
    onVoiceUpdate({
      audioBlob: null,
      backgroundMusic: selectedMusic,
      volume,
      duration: 0
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleMusicChange = (music) => {
    setSelectedMusic(music);
    onVoiceUpdate({
      audioBlob,
      backgroundMusic: music,
      volume,
      duration: recordingTime
    });
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    onVoiceUpdate({
      audioBlob,
      backgroundMusic: selectedMusic,
      volume: newVolume,
      duration: recordingTime
    });
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-romantic border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-romantic-gradient rounded-full flex items-center justify-center">
          <Icon name="Mic" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="font-playfair text-xl font-semibold text-foreground">Voice Message</h3>
          <p className="text-sm text-muted-foreground">Add your voice to make it personal</p>
        </div>
      </div>
      {/* Recording Interface */}
      <div className="mb-6">
        <div className="flex flex-col items-center space-y-6 p-8 bg-romantic-gradient rounded-2xl">
          {/* Waveform Visualization (Mock) */}
          <div className="flex items-center justify-center space-x-1 h-16">
            {isRecording ? (
              Array.from({ length: 20 })?.map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-secondary rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 40 + 10}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))
            ) : (
              <div className="flex items-center space-x-2 text-secondary/60">
                <Icon name="Mic" size={24} />
                <span className="font-inter text-sm">Ready to record</span>
              </div>
            )}
          </div>

          {/* Timer */}
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-secondary mb-1">
              {formatTime(recordingTime)}
            </div>
            <div className="text-sm text-secondary/70">
              {isRecording ? (isPaused ? 'Paused' : 'Recording...') : 'Ready'}
            </div>
          </div>

          {/* Recording Controls */}
          <div className="flex items-center space-x-4">
            {!isRecording && !audioBlob && (
              <Button
                variant="default"
                size="lg"
                iconName="Mic"
                iconPosition="left"
                onClick={startRecording}
                className="bg-secondary text-white hover:bg-secondary/90 px-8"
              >
                Start Recording
              </Button>
            )}

            {isRecording && (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  iconName={isPaused ? "Play" : "Pause"}
                  onClick={pauseRecording}
                  className="border-secondary text-secondary hover:bg-secondary/10"
                >
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  iconName="Square"
                  onClick={stopRecording}
                  className="bg-error text-white hover:bg-error/90"
                >
                  Stop
                </Button>
              </>
            )}

            {audioBlob && !isRecording && (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  iconName={isPlaying ? "Pause" : "Play"}
                  onClick={playRecording}
                  className="border-secondary text-secondary hover:bg-secondary/10"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="RotateCcw"
                  onClick={() => {
                    setRecordingTime(0);
                    startRecording();
                  }}
                  className="border-accent text-accent hover:bg-accent/10"
                >
                  Re-record
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Trash2"
                  onClick={deleteRecording}
                  className="border-error text-error hover:bg-error/10"
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Audio Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Background Music"
          options={backgroundMusicOptions}
          value={selectedMusic}
          onChange={handleMusicChange}
          description="Add ambient music to enhance your message"
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Voice Volume
          </label>
          <div className="flex items-center space-x-3">
            <Icon name="VolumeX" size={16} className="text-muted-foreground" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeChange(parseInt(e?.target?.value))}
              className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <Icon name="Volume2" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground w-8">{volume}%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Adjust your voice level relative to background music
          </p>
        </div>
      </div>
      {/* Recording Tips */}
      <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
        <div className="flex items-start space-x-3">
          <Icon name="Mic" size={20} className="text-success mt-0.5" />
          <div>
            <h4 className="font-inter font-medium text-foreground mb-1">Recording Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Find a quiet space for the best audio quality</li>
              <li>• Speak clearly and at a comfortable pace</li>
              <li>• Keep your message between 30 seconds to 2 minutes</li>
              <li>• Let your emotions come through naturally</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Hidden audio element for playback */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  );
};

export default VoiceRecorder;