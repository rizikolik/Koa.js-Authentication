const metaDataGetter = (path) =>
  ffmpeg.ffprobe(path, function (err, metadata) {
    if (err) {
      throw err;
    } else {
      return metadata;
    }
  });
