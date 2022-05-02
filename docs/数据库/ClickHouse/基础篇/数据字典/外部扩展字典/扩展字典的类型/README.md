# 扩展字典的类型

扩展字典的类型使用 `layout` 元素定义，目前共有 `7` 中类型。一个字典的类型，既决定了其数据在内存中的存储结构，也决定了该字典支持的 `key` 键类型。根据 `key` 键类型的不同，可以将他们划分为**两类**：一类是以 `flat` 、 `hashed` 、 `range_hashed` 和 `cache` 组成的单数值 `key` 类型，因为他们均使用单个数值型的 `id` ；另一类则是由 `complex_key_hashed` 、 `complex_key_cache` 和 `ip_trie` 组成的复合 `key` 类型。 `complex_key_hashed` 与 `complex_key_cache` 字典在功能方面与 `hashed` 和 `cache` 并无二致，只是单纯地将数值型 `key` 替换成了复合型 `key` 而已。

在这 `7` 种字典中， `flat` 、 `hashed` 和 `range_hashed` 依次拥有最高的性能，而 `cache` 性能最不稳定。

`7` 种字典的特点总结如下：

|名称|存储结构|字典键类型|支持的数据来源|
|-----|-----|-----|-----|
| `flat` |数组| `UInt64` |1. **Local file** <br />2. **Executable file** <br />3. **HTTP** <br />4. **DBMS**|
| `hashed` |散列| `UInt64` |1. **Local file** <br />2. **Executable file** <br />3. **HTTP**<br />4. **DBMS**|
| `range_hashed` |散列并按时间排序| `UInt64` 和**时间**|1. **Local file** <br />2. **Executable file** <br />3. **HTTP**<br />4. **DBMS**|
| `complex_key_hashed` |散列|复合型 `key` |1. **Local file** <br />2. **Executable file** <br />3. **HTTP**<br />4. **DBMS**|
| `ip_trie` |层次结构|复合型 `key` （单个 `String` ）|1. **Local file** <br />2. **Executable file** <br />3. **HTTP**<br />4. **DBMS**|
| `cache` |固定大小数组| `UInt64` |1. **Executable file** <br />2. **HTTP**<br />3. **ClickHouse**<br />4. **MySQL**|
| `complex_key_cache` |固定大小数组|复合型 `key` |1. **Executable file** <br />2. **HTTP**<br />3. **ClickHouse**<br />4. **MySQL**|
