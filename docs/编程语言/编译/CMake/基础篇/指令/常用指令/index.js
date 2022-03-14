const addDefinitions = require('./ADD_DEFINITIONS');
const addDependencies = require('./ADD_DEPENDENCIES');
const addSubDirectory = require('./ADD_SUBDIRECTORY');
const addExecutable = require('./ADD_EXECUTABLE');
const addLibrary = require('./ADD_LIBRARY');
const addTest = require('./ADD_TEST');
const auxSourceDirectory = require('./AUX_SOURCE_DIRECTORY');
const enableTesting = require('./ENABLE_TESTING');
const execProgram = require('./EXEC_PROGRAM');
const cmakeMinimumRequired = require('./CMAKE_MINIMUM_REQUIRED');
const file = require('./FILE');
const findPackage = require('./find_package');
const includeDirectories = require('./include_directories');
const linkLibraries = require('./link_libraries');

module.exports = {
  title: '常用指令',
  children: [
    addDefinitions,
    addDependencies,
    addSubDirectory,
    addExecutable,
    addLibrary,
    addTest,
    auxSourceDirectory,
    enableTesting,
    execProgram,
    cmakeMinimumRequired,
    file,
    findPackage,
    includeDirectories,
    linkLibraries
  ]
};
