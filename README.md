# Songbox

![Codeship status](https://codeship.com/projects/0090af20-dad7-0133-a4fc-5a647b2fc712/status?branch=master)

## Development

You need to have golang installed & GOPATH configured

```sh
cd ./webapp
npm install
npm run build
cd ../
go get .
go get github.com/beego/bee
bee run
```

## Deployment

Compress the project.

```sh
cd ./webapp
npm install
npm run build
cd ../
go get .
go get github.com/beego/bee
bee pack -exr=webapp
```
