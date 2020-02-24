const fs = require('fs');

process.stdout.write(
    'Copying pre-commit file to .git/hooks/ (will not overwrite existing file)... ',
);
fs.copyFileSync(
    '.dev/pre-commit',
    '.git/hooks/pre-commit',
    fs.constants.COPYFILE_EXCL,
);
process.stdout.write('done.\n\n');
