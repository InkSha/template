/** uni-automator自动注入的全局对象 */
declare module program {
  /** 提供了控制页面元素的方法 */
  interface Element {
    /** 小写的标签名 */
    tagName: string

    /**
     * 元素内获取元素
     * @param selector 选择器
     */
    $(selector: string): Promise<Element>

    /**
     * 元素内获取元素数组
     * @param selector 选择器
     */
    $$(selector: string): Promise<Element[]>

    /** 获取元素大小 */
    size(): Promise<Size>

    /** 获取元素绝对位置 */
    offset(): Promise<Object>

    /** 元素文本 */
    text(): Promise<string>

    /**
     * 获取元素属性
     * @param name 属性名称
     */
    attribute(name: string): Promise<string>

    /**
     * 获取元素属性
     * @param name 属性名称
     *
     * 与 `Element.attribute` 不同,
     * `element.property` 返回值不一定是字符串
     * `element.property` 不能获取 class 和 id
     * `element.property` 可以获取到文档对应组件列举的大部分属性值
     */
    property(name: string): Promise<any>

    /** 获取元素 html */
    html(): Promise<string>

    /** 只会获取元素本身 html */
    outerHtml(): Promise<string>

    /** 获取元素值 */
    value(): Promise<string>

    /**
     * 获取元素样式
     * @param name 样式名称
     *
     * ```ts
     * console.log(await element.style('color')) // -> 'rgb(128, 128, 128)'
     * ```
     */
    style(name: string): Promise<string>

    /** 点击元素 */
    tap(): Promise<void>

    /** 长按元素 */
    longpress(): Promise<void>

    /**
     * 手指开始触摸元素
     * @param options 触摸选项
     */
    touchstart(options: TouchOptions): Promise<void>

    /**
     * 手指触摸后移动
     * @param options 触摸选项
     */
    touchmove(options: TouchOptions): Promise<void>

    /**
     * 手指结束触摸
     * @param options 触摸选项
     */
    touchend(options: TouchOptions): Promise<void>

    /**
     * 触发元素事件
     * @param type 触发事件类型
     * @param detail 触发时传递的 detail
     */
    trigger(type: string, detail?: Object): Promise<void>

    /**
     * 输入文本 仅 input textarea
     * @param value 输入内容
     */
    input(value: string): Promise<void>

    /**
     * 调用组件实例指定方法 仅 自定义组件
     * @param method 调用方法名
     * @param args 方法参数
     */
    callMethod(method: string, ...args: any[]): Promise<any>

    /**
     * 获取组件实例渲染数据 仅 自定义组件
     * @param path 数据路径
     */
    data(path?: string): Promise<Object>

    /**
     * 设置组件实例渲染数据 仅 自定义组件
     * @param path 数据路径
     */
    setData(data: Object): Promise<void>

    /**
     * 调用上下文对象方法 仅 video 组件
     * @param method 调用方法名称
     * @param args 方法参数
     */
    callContextMethod(method: string, ...args: any[]): Promise<any>

    /** 获取滚动宽度 仅 scroll-view */
    scrollWidth(): Promise<number>

    /** 获取滚动高度 仅 scroll-view */
    scrollHeight(): Promise<number>

    /**
     * 滚动到指定位置 仅 scroll-view
     * @param x 横向滚动位置
     * @param y 纵向滚动位置
     */
    scrollTo(x: number, y: number): Promise<void>

    /**
     * 滑动到指定滑块 仅 swiper
     * @param index 目标滑块的 index
     */
    swipeTo(index: number): Promise<void>

    /**
     * 移动视图容器 仅 movable-view
     * @param x x轴方向偏移
     * @param y y轴方向偏移
     */
    moveTo(x: number, y: number): Promise<void>

    /**
     * 滑动到指定数值，仅 slider
     * @param value 滑动到的值
     */
    slideTo(value: number): Promise<void>
  }

  /** 提供了控制页面的方法 */
  interface Page {
    /** 页面路径 */
    path: string

    /** 页面参数 */
    query: object

    /**
     * 获取页面元素
     * @param selector 选择器
     */
    $(selector: string): Promise<Element>

    /**
     * 获取页面元素列表
     * @param selector 选择器
     */
    $$(selector: string): Promise<Element[]>

    /**
     * 选择器选中元素存在时结束等待
     * @param condition 选择器
     */
    waitFor(condition: string): Promise<void>

    /**
     * 等待指定时间
     * @param condition 等待时间 单位 s
     */
    waitFor(condition: number): Promise<void>

    /**
     * 当函数返回 true 时结束等待
     * @param condition 断言函数
     */
    waitFor(condition: () => boolean): Promise<void>

    /**
     * 获取页面渲染数据
     * @param path 数据路径
     */
    data(path?: string): Promise<Object>

    /**
     * 设置页面数据
     * @param data 改变的数据
     */
    setData(data: Object): Promise<void>

    /** 获取页面大小 */
    size(): Promise<Size>

    /** 获取页面滚动位置 */
    scrollTop(): Promise<number>

    /**
     * 调用页面指定方法
     * @param method 调用方法
     * @param args 方法参数
     */
    callMethod(method: string, ...args: any[]): Promise<any>
  }

  interface TouchOptions {
    /** 当前停留在屏幕中的触摸点信息数组 */
    touches: array
    /** 当前变化的触摸点信息数组 */
    changedTouches: array
  }

  /** 页面大小 */
  interface Size {
    /** 可滚动宽度 */
    width: number
    /** 可滚动高度 */
    height: number
  }

  /** 元素绝对位置 */
  interface Offset {
    /** 左上角 x 坐标 单位：px */
    left: number
    /** 左上角 y坐标 单位：px */
    top: number
  }

  /** 截图选项 */
  interface ScreenshotOptions {
    /** 图片保存路径 默认根目录 */
    path: string
  }

  /** 用户列表 */
  interface Account {
    /** 用户昵称 */
    nickName: string
    /** 账号 openid */
    openid: string
  }

  /** 获取页面堆栈 */
  function pageStack(): Promise<Page[]>

  /**
   * 保留当前页面，跳转某个页面
   * @param url 需要跳转的非 tabBar 的页面的路径
   */
  function navigateTo(url: string): Promise<Page>

  /**
   * 关闭当前页面并跳转某个页面
   * @param url 需要跳转的非 tabBar 的页面的路径
   */
  function redirectTo(url: string): Promise<Page>

  /** 关闭当前页 返回上一页面  */
  function navigateBack(): Promise<Page>

  /**
   * 关闭所有页面，跳转页面
   * @param url 跳转的应用内页面路径
   */
  function reLaunch(url: string): Promise<Page>

  /**
   * 跳转到 tabBar 页面并关闭所有非 tabBar 页面
   * @param url 跳转的应用内页面路径
   */
  function switchTab(url: string): Promise<Page>

  /** 获取当前页面 */
  function currentPage(): Promise<Page>

  /** 获取系统信息 */
  function systemInfo(): Promise<Object>

  /**
   * 将页面滚动到目标位置
   * @param scrollTop 滚动到的目标为止 单位 px
   */
  function pageScrollTo(scrollTop: number): Promise<void>

  /**
   * 调用 uni 对象上的指定方法
   * @param method 调用方法名称
   * @param args 方法参数
   *
   * ```ts
   * await program.callUniMethod('setStorage', { key: 'test', data: '123456' })
   * const data = await program.callUniMethod('getStorageSync', 'test')
   * console.log(data) // -> '123456'
   * ```
   */
  function callUniMethod(method: string, ...args: any[]): Promise<any>

  /**
   * 截图当前页面 仅开发者工具模拟器支持 客户端无法使用
   * @param options 截图选项 不传入则返回图标 base64 编码
   */
  function screenshot(options?: ScreenshotOptions): Promise<string | void>

  /**
   * 覆盖 uni 对象上的指定方法调用结果
   *
   * 利用此方法，可以方便指定指定 `uni.chooseLocation` 等调用系统组件的返回结果
   * @param method 覆盖方法名称
   * @param result 指定调用结果
   */
  function mockUniMethod(method: string, result: any): Promise<void>

  /**
   * 覆盖 uni 对象上的指定方法调用结果
   *
   * 利用此方法，可以方便指定指定 `uni.chooseLocation` 等调用系统组件的返回结果
   * @param method 覆盖方法名称
   * @param fn 处理返回函数
   * @param args 传入参数
   */
  function mockUniMethod(
    method: string,
    fn: Function | string,
    ...args: any[]
  ): Promise<void>

  /**
   * 重置 uni 指定方法 消除 mockUniMethod 影响
   * @param method 重置的方法名称
   */
  function restoreUniMethod(method: string): Promise<void>

  /**
   * 注入代码片段并返回执行结果 （仅微信）
   * @param appFunction 代码片段
   * @param args 执行时传入参数
   */
  function evaluate(
    appFunction: Function | string,
    ...args: any[]
  ): Promise<any>

  /** 获取多账号调试中已添加的用户列表。（仅微信） */
  function testAccounts(): Promise<Account[]>

  /**
   * 在全局暴露方法，供小程序侧调用测试脚本中的方法（仅微信）
   * @param name 全局方法名称
   * @param bindingFunction 脚本方法
   */
  function exposeFunction(
    name: string,
    bindingFunction: Function,
  ): Promise<void>
}
