import Bottom from '@/components/Bottom';
import {
  act,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from '@testing-library/react';
import useRequest from '@/hooks/useRequest';
import { getWeekZh } from '@/utils';
import { MemoryRouter } from 'react-router-dom';

describe('测试', () => {
  it('utils 测试', () => {
    const res = getWeekZh('Monday');
    // 断言
    expect(res).toBe('周一');
  });

  it('hooks 测试', async () => {
    const service = () =>
      new Promise((r) => {
        r(true);
      });
    const { result } = renderHook(() => useRequest(service, {}));
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await waitFor(() => {});
    // 断言
    expect(result.current.data).toBe(true);
  });

  it('组件测试', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Bottom />
      </MemoryRouter>,
    );

    const myDom = getByText('我的');

    // 如果需要等待 state 的变化，请包 act 函数
    act(() => {
      fireEvent.click(myDom);
    });

    // 断言
    expect(myDom.parentElement?.className).toContain('adm-tab-bar-item-active');
  });
});
