# VSCode region 用法

[官方文档](https://code.visualstudio.com/docs/editor/codebasics#_folding)

各种语言的 `region` 语法

|语言|开始region注释|结束region注释|
|-----|-----|-----|
|Bat|	 `::#region` or `REM #region` 	| `::#endregion` or `REM #endregion` |
|C#	| `#region` 	| `#endregion` |
|C/C++|	 `#pragma region` |	 `#pragma endregion` |
|CSS/Less/SCSS	| `/*#region*/` |	 `/*#endregion*/` |
|Coffeescript	| `#region` |	 `#endregion` |
|F#	| `//#region` or `(#_region)` |	 `//#endregion` or `(#_endregion)` |
|Java	| `//#region` or `//\<editor-fold\>` 	| `// #endregion` or `//\</editor-fold\>` |
|Markdown|	 `\<!-- #region --\>` |	 `\<!-- #endregion --\>` |
|Perl5|	 `#region` or `=pod` 	| `#endregion` or `=cut` |
|PHP	| `#region` |	 `#endregion` |
|PowerShell|	 `#region` 	| `#endregion` |
|Python	| `#region` or `# region` |	 `#endregion` or `# endregion` |
|TypeScript/JavaScript|	 `//#region` 	| `//#endregion` |
|Visual Basic| `#Region` |	 `#End Region` |

## 快捷键

* `Ctrl K 8`：折叠所有region
* `Ctrl K 9`：展开所有region
