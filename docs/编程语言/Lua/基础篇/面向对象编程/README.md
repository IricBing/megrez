# 面向对象编程

从很多意义上讲， `Lua` 语言中的**一张表就是一个对象**。首先，表与对象一样，可以拥有状态。其次，表与对象一样，拥有一个与其值无关的标识（ `self` ）。特别的，两个具有相同值的对象（表）是两个不同的对象，而一个对象可以具有多个不同的值。最后，表与对象一样，具有与创建者和被创建位置无关的生命周期。

对象有其自己的操作。表也可以有自己的操作，例如：

```lua
Account = {balance = 0}
function Account.withdraw (v)
  Account.balance = Account.balance - v
end
```

上面的代码创建了一个新函数，并将该函数存入 `Account` 对象的 `withdraw` 字段。然后，我们就可以进行如下的调用：

```lua
Account.withdraw(100.00)
```

这种函数差不多就是所谓的**方法**（ `method` ）了。不过，在函数中使用全局名称 `Account` 是一个非常糟糕的编程习惯。首先，这个函数只能针对**特定对象**工作。其次，即使针对特定的对象，这个函数也只有在对象保存在特定的全局变量中时才能工作。如果我们改变了对象的名称， `withdraw` 就不能工作了：

```lua
a, Account = Account, nil
a.withdraw(100.00)        -- ERROR!
```

这种行为违反对象拥有独立生命周期的原则。

另一种更加有原则的方法是对操作的**接受者**（ `receiver` ）进行操作。因此，我们的方法需要一个额外的参数来表示该接受者，这个参数通常被称为 `self` 或 `this` ：

```lua
function Account.withdraw (self, v)
  self.balance = self.balance -v 
end
```

此时，当我们调用该方法时，必须指定要操作的对象：

```lua
a1 = Account; Account = nil
...
a1.withdraw(a1,100.00)      -- OK
```

通过使用参数 `self` ，可以对多个对象调用相同的方法：

```lua
a2 = {balance = 0, withdraw = Account.withdraw}
...
a2.withdraw(a2, 260.00)
```

使用参数 `self` 是所有面向对象语言的核心点。大多数面向对象语言都向程序员隐藏了这个机制，从而使得程序员不必显式地声明这个参数（虽然程序员仍然可以在方法内使用 `self` 或者 `this` ）。 `Lua` 语言同样可以使用**冒号操作**符隐藏该参数。使用冒号操作符，我们可以将上例重写为 `a2:withdraw(260.00)`

```lua
function Account:withdraw(v)
  self.balance = self.balance -v
end
```

冒号的作用是**在一个方法中增加一个额外的实参，或在方法的定义中增加一个额外的隐藏形参**。冒号只是一种语法机制，虽然很便利，但**没有引入任何新的东西**。我们可以使用点分语法来定义一个函数，然后用冒号语法调用它，反之亦然，只要能够正确地处理好额外的参数即可：

```lua
Account = {
  balance = 0
  withdraw = function(self,v)
    self.balance = self.balance -v
  end
}

function Account:deposit(v)
  self.balance = self.balance + v
end

Account.deposit(Account, 500.00)
Account:withdraw(1000.00)
```
