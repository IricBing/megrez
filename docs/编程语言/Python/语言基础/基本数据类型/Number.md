# Number（数字类型）

## 数字类型

数字类型有 `int` 、 `float` 、 `bool` 、 `complex` （**复数**）

### int（整型）

在**32位**机器上，整数的位数为**32位**，取值范围为$[-2^{31}, 2^{31}-1]$。

在**64位**机器上，整数的位数为**64位**，取值范围为$[-2^{63}, 2^{63}-1]$。

### long（长整型）

跟C语言不同， `Python` 的长整型没有指定**位宽**，即 `Python` 没有**限制长整型的大小**，但实际上由于机器内存有限，长整数不可能无限大。

自从 `Python 2.2` 起，如果整数发生**溢出**， `Python` 会**自动将整数转换为长整数**，所以，如今即便在长整数的后面不加 `字母L` 也不会导致严重后果。

### float（浮点型）

浮点数用来处理实数，即带有小数的数字。类似于C语言中的double类型，占8个字节（64位），其中52位表示底，11位表示指数，剩下的一位表示符号。

### complex（复数）

复数由**实数部分**和**虚数部分**组成，一般形式为 `x+yi` ，其中， `x` 是复数的**实数部分**， `y` 是复数的**虚数部分**，这里的 `x` 和 `y` 都是**实数**。

## 查看数据类型

在 `Python3` 里，只有一种整数类型 `int` ，表示为**长整型**，没有 `python2` 中的 `Long` 。

内置的 `type()` 函数可以用来**查询变量所指的对象类型**。

```python
>>> a, b, c, d = 20, 5.5, True, 4+3j
>>> print(type(a), type(b), type(c), type(d))
<class 'int'> <class 'float'> <class 'bool'> <class 'complex'>
```

此外还可以用 `isinstance()` 方法来判断：

```python
>>> a = 111
>>> isinstance(a, int)
True
```

`isinstance()` 和 `type()` 函数的区别在于： `type()` 函数**不会**认为子类是一种父类类型， `isinstance()` 函数则**会**认为子类是一种父类类型。示例程序如下：

```python
>>> class A:
...     pass
>>> class B(A):       # B继承A，是A的子类
...     pass
>>> isinstance(A(), A)
True
>>> type(A()) == A
True
>>> isinstance(B(), A)    # isinstance()函数会认为子类是一种父类类型
True
>>> type(B()) == A      # type()函数会不会认为子类是一种父类类型
False
```
