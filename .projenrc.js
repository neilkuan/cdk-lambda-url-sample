const { awscdk } = require("projen");
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.19.0",
  defaultReleaseBranch: "main",
  name: "LambdaUrl",
  gitignore: ['cdk.out'],
});
project.synth();