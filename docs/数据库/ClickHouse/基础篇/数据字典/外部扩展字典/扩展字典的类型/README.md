# 扩展字典的类型

扩展字典的类型使用 `layout` 元素定义，目前共有 `7` 中类型。一个字典的类型，既决定了其数据在内存中的存储结构，也决定了该字典支持的 `key` 键类型。根据 `key` 键类型的不同，可以将他们划分为**两类**：一类是以 `flat` 、 `hashed` 、 `range_hashed` 和 `cache` 组成的单数值 `key` 类型，因为他们均使用单个数值型的 `id` ；另一类则是由 `complex_key_hashed` 、 `complex_key_cache` 和 `ip_trie` 组成的复合 `key` 类型。 `complex_key_hashed` 与 `complex_key_cache` 字典在功能方面与 `hashed` 和 `cache` 并无二致，只是单纯地将数值型 `key` 替换成了复合型 `key` 而已。
