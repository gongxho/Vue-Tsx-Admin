// tsx组件测试用例
import { describe, it, expect } from 'vitest'
import { h } from "vue"; // 可以通过 ts 编译，需要在 ts.config.json 中配置

import { mount } from '@vue/test-utils'
import HelloWord from '../HelloWord'


