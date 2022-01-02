
//TODO Dokumentace 
//TODO Opravit console logy

const fs = require('fs');
const spawn = require('child_process').spawn;
const { exec } = require('child_process');
function filterProjects(projects) {
  return Object.keys(projects).filter((project) => project.indexOf('e2e') === -1);
}

fs.readFile(`angular.json`, 'utf8', async (err, data) => {
  if (err) throw err;

  ngCli = JSON.parse(data);

  var projects = filterProjects(ngCli.projects);

  for (var i = 0; i < projects.length; i += 1) {
    let promises = [];
    promises.push(buildProject(projects[i]));

    console.log('Building projects ' + projects.join(','));

    await Promise.all(promises).then(
      (statusCode) => {
        console.log('Projects ' + projects.join(',') + ' built successfully!');

        if (i + 1 === projects.length) {
          process.exit(0);
        }
      },
      (reject) => {
        console.log(reject);
        process.exit(1);
      }
    );
  }
});

function buildProject(project) {
  return new Promise((resolve, reject) => {
    var params = exec(`ng build --project ${project} --prod --extract-licenses --build-optimizer`);

    params.on('error', (er) => {
      console.log(er);
    });

    params.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    params.stderr.on('data', (data) => {
      process.stdout.write('.');
    });

    params.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}
