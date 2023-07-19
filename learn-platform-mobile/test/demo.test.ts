import { getWeekZh } from '@/utils';

describe('测试', () => {
  it('utils测试', () => {
    // 构造环境
    // 调用被测试对象
    // 断言
    const res = getWeekZh('Monday');
    expect(res).toBe('周一');
  });
});
