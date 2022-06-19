const gaze = require('gaze');
//https://github.com/shama/gaze

// Watch all files/dirs in process.cwd()
gaze([
       '*.last.html',
       '**/*.Last.html',
       '**/**/*.Last.html',
       '**/*.last.html',
       '**/**/*.last.html'
     ], (err, watcher) => {
  // Files have all started watching

  // On file changed
  watcher.on('changed', filepath => {
    console.log(filepath + ' was changed');
  });

  // On file added
  watcher.on('added', filepath => {
    console.log(filepath + ' was added');
  });

  // On file deleted
  watcher.on('deleted', filepath => {
    console.log(filepath + ' was deleted');
  });

  // On changed/added/deleted
//  watcher.on('all', (event, filepath) => {
//    console.log(filepath + ' was ' + event);
//  });

  // Get all watched files
  const watched = watcher.watched();
  // Get watched files with relative paths
  const files = watcher.relative();
});