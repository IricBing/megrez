# 开机启动

## 原理

## 实现

编写 `SystemHelper` 帮助类，内容如下：

```csharp
using Microsoft.Win32;
using System;
using System.Windows.Forms;

namespace Project.Helper
{
    public class SystemHelper
    {
        /// <summary>
        /// 注册用户信息
        /// </summary>
        public enum RegistryKeyEnum
        {
            /// <summary>
            /// 当前用户
            /// </summary>
            CurrentUser,
            /// <summary>
            /// 管理员
            /// </summary>
            LocalMachine,
            ClassesRoot,
            Users,
            PerformanceData,
            CurrentConfig
        }

        /// <summary>
        /// 程序开机启动方法
        /// </summary>
        /// <param name="strAppName">应用程序名称</param>
        /// <param name="isAutoRun">是否开机启动</param>
        /// <param name="registryKey">注册表注册到那个用户下，主要是当前用户与管理员的区别</param>
        public static void SetAutoRun(string strAppName, bool isAutoRun, RegistryKeyEnum registryKey = RegistryKeyEnum.CurrentUser)
        {
            try
            {
                RegistryKey reg = registryKey switch
                {
                    RegistryKeyEnum.CurrentUser => Registry.CurrentUser,
                    RegistryKeyEnum.LocalMachine => Registry.LocalMachine,
                    RegistryKeyEnum.ClassesRoot => Registry.ClassesRoot,
                    RegistryKeyEnum.Users => Registry.Users,
                    RegistryKeyEnum.PerformanceData => Registry.PerformanceData,
                    RegistryKeyEnum.CurrentConfig => Registry.CurrentConfig,
                    _ => throw new ArgumentException(message: "用户类型不合法")
                };

                RegistryKey run = reg.CreateSubKey(@"SOFTWARE\Microsoft\Windows\CurrentVersion\Run");
                if (isAutoRun)
                {
                    run.SetValue(strAppName, Application.ExecutablePath);
                }
                else
                {
                    run.DeleteValue(strAppName, false);
                }
                run.Close();
                reg.Close();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
```

## 使用

```csharp
SystemHelper.SetAutoRun("JX-VCOM", true);  // 注册到普通用户下面
SystemHelper.SetAutoRun("JX-VCOM", true, SystemHelper.RegistryKeyEnum.LocalMachine);  // 注册到管理员用户下面
```