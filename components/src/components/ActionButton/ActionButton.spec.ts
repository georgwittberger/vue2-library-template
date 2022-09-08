import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/vue';
import { describe, expect, it, vi } from 'vitest';
import { ActionButtonVariant } from './ActionButton.model';
import ActionButton from './ActionButton.vue';

describe('ActionButton', () => {
  it('should render button element', () => {
    render(ActionButton);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render default slot as button caption', () => {
    render(ActionButton, {
      slots: { default: 'Test Caption' },
    });
    expect(screen.getByRole('button')).toHaveTextContent('Test Caption');
  });

  it.each([
    ['action-button--default', ActionButtonVariant.default],
    ['action-button--primary', ActionButtonVariant.primary],
    ['action-button--secondary', ActionButtonVariant.secondary],
  ])('should render class "%s" when variant is "%s"', (className, variant) => {
    render(ActionButton, {
      propsData: { variant },
    });
    expect(Array.from(screen.getByRole('button').classList)).toContain(
      className
    );
  });

  it('should emit click event when button is clicked', async () => {
    const clickSpy = vi.fn();
    render(ActionButton, {
      listeners: { click: clickSpy },
    });
    const user = userEvent.setup();
    await user.click(screen.getByRole('button'));
    expect(clickSpy).toHaveBeenCalledOnce();
    expect(clickSpy).toHaveBeenCalledWith(expect.any(Event));
  });
});
