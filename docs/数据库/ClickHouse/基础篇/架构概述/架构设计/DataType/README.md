# DataType

数据的**序列化**和**反序列化**工作由 `DataType` 负责。 `IDataType` 接口定义了许多正反序列化的方法，他们成对出现，例如 `serializeBinary` 和 `deserializeBinary` 、 `serializeTextJSON` 和 `deserializeTextJSON` 等，涵盖了常用的**二进制**、**文本**、**JSON**、**XML**、**CSV**和**Protobuf**等多种格式类型。 `IDataType` 也使用了**泛化**的设计模式，具体方法的实现逻辑由对应数据类型的实例承载，例如 `DataTypeString` 、 `DataTypeArray` 及 `DataTypeTuple` 等。

`DataType` 虽然负责序列化相关工作，但它并不直接负责数据的读取，而是转由从 `Column` 或 `Field` 对象获取。在 `DataType` 的实现类中，聚合了相应数据类型的 `Column` 对象和 `Field` 对象。例如， `DataTypeString` 会引用字符串类型的 `ColumnString` ，而 `DataTypeArray` 则会引用数组类型的 `ColumnArray` ，以此类推。
