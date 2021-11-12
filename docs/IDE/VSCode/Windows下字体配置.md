# Windows下字体配置

由于使用了`oh my posh`来美化了`PowerShell`终端，并采用了`MesloLGL NF`专用字体。所以`vscode`需要对应的配置，打开`settings.json`配置文件，写入如下配置即可：

```json
{
  "editor.fontFamily": "Fira Code",
  "editor.fontLigatures": true,
  "terminal.integrated.fontFamily": "MesloLGL NF"
}
```