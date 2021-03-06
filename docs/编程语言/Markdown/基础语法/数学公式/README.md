# 数学公式


> [!tip|label:提示]
> 本笔记适用于`docsify`环境，如果想要兼容`Gitlab`环境可参考笔记：[gitlab兼容](./gitlab兼容.md)

## 基本语法

* **正文**中的`LaTeX`公式用`$...$`定义
* 语句示例：`$\sum_{i=0}^N\int_{a}^{b}g(t, i)\text{d}t$`
* 显示在当前行内$\sum_{i=0}^N\int_{a}^{b}g(t, i)\text{d}t$
* **单独显示**的`LaTeX`公式用`$$...$$`定义，此时公式**居中并放大**显示
* 语句示例：`$$\sum_{i=0}N\int_{a}{b}g(t, i)\text{d}t$$`
* 显示为：

  $$\sum_{i=0}N\int_{a}{b}g(t, i)\text{d}t$$

## 希腊字母

|显示|命令|显示|命令|
|-----|-----|-----|-----|
|α	|\alpha	|β	|\beta|
|γ	|\gamma	|δ	|\delta|
|ε	|\epsilon	|ζ	|\zeta|
|η	|\eta	|θ	|\theta|
|ι	|\iota	|κ	|\kappa|
|λ	|\lambda	|μ	|\mu|
|ν	|\nu	|ξ	|\xi|
|π	|\pi	|ρ	|\rho|
|σ	|\sigma	|τ	|\tau|
|υ	|\upsilon	|φ	|\phi|
|χ	|\chi	|ψ	|\psi|
|ω	|\omega	| |  	|

如果想要显示**大写**字母，将命令首字母大写即可，例如 `$\Beta$` 呈现为：$\Beta$

如果想要显示**斜体**希腊字母，在命令前面加上 `var` 前缀即可，例如： `$\varGamma$` 呈现为：$\varGamma$

## 字母修饰

### 上下标

**上标**采用 `^` ，**下标**采用 `_` ，例如： `$C_n^2$` 显示为：$C_n^2$

### 矢量

`$\vec a$` 显示为：$\vec a$

`$\overrightarrow{xy}$` 显示为：$\overrightarrow{xy}$

### 字体

#### Typewriter

`$\mathtt{A}$` 显示为：$\mathtt{A}$

$\mathtt{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$

#### Blackboard Bold

`$\mathbb{A}$` 显示为：$\mathbb{A}$

$\mathbb{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$

#### Sans Serif

`$\mathsf{A}$` 显示为：$\mathsf{A}$

$\mathsf{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$

### 分组

使用 `{}` 将具有相同等级的内容扩入其中，组成一组，例如： `$10^{10}$` 显示为：$10^{10}$，而 `$10^10$` 显示为：$10^10$

### 括号

* 小括号：`$()$`显示为：$()$
* 中括号：`$[]$`显示为：$[]$
* 尖括号：`$\langle \rangle$`显示为：$\langle \rangle$

  此处与分组符号 `${}$` 相区别，使用转义符号 `\`

* 使用`$\left$`（或`$\right$`）使符号大小与相临近的公式相适应；该语句适用于所有括号类型
  + `$(\frac{x}{y})$` 显示为：$(\frac{x}{y})$
  + 而`$\left(\frac{x}{y}\right)$`显示为：$\left(\frac{x}{y}\right)$

### 求和

使用 `$\sum$` 来表示求和，例如： `$\sum_{i=1}^n{a_1}$` 显示为：$\sum_{i=1}^n{a_1}$

### 极限

使用 `$\lim$` 来表示极限，例如： `$\lim_(x \to 0)$` 显示为：$\lim_(x \to 0)$

### 积分

使用 `$\int$` 来表示积分，例如： `$\int_0^\infty{fxdx}$` 显示为：$\int_0^\infty{fxdx}$

### 分式

使用 `$\frac{公式1}{公式2}$` 来表示分式，例如： `$\frac{公式1}{公式2}$` 显示为：$\frac{公式1}{公式2}$

### 根式

使用 `$\sqrt[x][y]$` 来表示根式，例如： `$\sqrt[x][y]$` 显示为：$\sqrt[x][y]$

### 特殊函数

特殊函数的表示为： `$\函数名$` ，例如： 

* `$\sin x$` 显示为：$\sin x$
* `$\ln x$` 显示为：$\ln x$
* `$\max(A, B, C)$` 显示为：$\max(A, B, C)$

### 特殊符号

|显示|命令|
|-----|-----|
|$\infty$| `$\infty$` |
|$\cup$| `$\cup$` |
|$\cap$| `$\cap$` |
|$\subset$| `$\subset$` |
|$\subseteq$| `$\subseteq$` |
|$\supset$| `$\supset$` |
|$\in$| `$\in$` |
|$\notin$| `$\notin$` |
|$\varnothing$| `$\varnothing$` |
|$\forall$| `$\forall$` |
|$\exists$| `$\exists$` |
|$\nabla$| `$\nabla$` |
|$\partial$| `$\partial$` |

### 空格

`LaTeX` 语法本身会**忽略空格**的存在。

* **小空格**：`$a\ b$`显示为：$a\ b$
* **4格空格**：`$a\quad b$`显示为：$a\quad b$

## 矩阵

### 基本语法

起始标记为： `\begin{metrix}` ，结束标记为： `\end{matrix}` ，每一行末尾标记： `\\` ，行间元素之间以 `&` 分割。

例如：

```latex
$$
\begin{matrix}
    1&0&0\\
    0&1&0\\
    0&0&1\\
\end{matrix}
$$
```

显示为：

$$
\begin{matrix}

    1&0&0\\
    0&1&0\\
    0&0&1\\

\end{matrix}
$$

### 矩阵边框

在**起始、结束**标记处用下列词**替换** `matrix` 即可增加矩阵边框。

* `pmatrix`：小括号边框
* `bmatrix`：中括号边框
* `Bmatrix`：大括号边框
* `vmatrix`：单竖线边框
* `Vmatrix`：双竖线边框

### 省略元素

* 横省略号：\cdots
* 竖省略号：\vdots
* 斜省略号：\ddots

例如：

```latex
$$
\begin{bmatrix}
    {a_{11}}&{a_{12}}&{\cdots}&{a_{1n}}\\
    {a_{21}}&{a_{22}}&{\cdots}&{a_{2n}}\\
    {\vdots}&{\vdots}&{\ddots}&{\vdots}\\
    {a_{m1}}&{a_{m2}}&{\cdots}&{a_{mn}}\\
\end{bmatrix}
$$
```

显示为：

$$
\begin{bmatrix}

    {a_{11}}&{a_{12}}&{\cdots}&{a_{1n}}\\
    {a_{21}}&{a_{22}}&{\cdots}&{a_{2n}}\\
    {\vdots}&{\vdots}&{\ddots}&{\vdots}\\
    {a_{m1}}&{a_{m2}}&{\cdots}&{a_{mn}}\\

\end{bmatrix}
$$

### 阵列

需要 `array` 环境，起始、结束处以 `{array}` 声明。在 `{array}` 后以 `{}` 逐行统一声明对齐方式，**左对齐**： `l` ，**居中**： `c` ，**右对齐**： `r` 。在声明对齐方式时，插入 `|` 建立**竖线**，插入 `\hline` 建立**水平线**。

例如：

```latex
$$
\begin{array}{c|lll}
    {↓}&{a}&{b}&{c}\\
    \hline
    {R_1}&{c}&{b}&{a}\\
    {R_2}&{b}&{c}&{c}\\
\end{array}
$$
```

显示为：
$$
\begin{array}{c|lll}

    {↓}&{a}&{b}&{c}\\
    \hline
    {R_1}&{c}&{b}&{a}\\
    {R_2}&{b}&{c}&{c}\\
    

\end{array}
$$

### 方程组

起始、结尾处以 `{cases}` 声明

例如：

```latex
$$
\begin{cases}
    a_1x+b_1y+c_1z=d_1\\
    a_2x+b_2y+c_2z=d_2\\
    a_3x+b_3y+c_3z=d_3\\
\end{cases}
$$
```

显示为：

$$
\begin{cases}

    a_1x+b_1y+c_1z=d_1\\
    a_2x+b_2y+c_2z=d_2\\
    a_3x+b_3y+c_3z=d_3\\

\end{cases}
$$
