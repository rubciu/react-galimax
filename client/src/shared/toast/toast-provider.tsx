import React, { Component, useContext } from 'react';
import { createPortal } from 'react-dom';
import { generateUEID } from '../utils';
import { ToastController } from './toast-controller';

export type Toast = {
  id: string;
  content: string;
}

type Props = {
  autoDismissTimeout?: number
}

type State = {
  toasts: Toast[]
}

interface ContextProps {
  add: (id: string) => void;
  toasts: Toast[]
}

const ToastContext = React.createContext({} as ContextProps); // TODO: Review default state
const { Consumer, Provider } = ToastContext;

export class ToastProvider extends Component<Props, State> {
  state: State = { toasts: [] };

  onDismiss = (id: string) => () => {
    this.remove(id);
  } 

  add = (content: string) => {
    const id = generateUEID();
    const toast: Toast = { id, content };

    this.setState({
      toasts: [...this.state.toasts, toast]
    })
  }

  remove = (id: string) => {
    this.setState(state => {
      const toasts = state.toasts.filter(toast => toast.id !== id);

      return { toasts };
    })
  }

  render() {
    const { add } = this;
    const { children } = this.props;
    const { toasts } = this.state;
    const portalTarget = document.body;

    return (
      <Provider value={{ add, toasts }}>
        {children}

        {createPortal(
            <ul>{
              toasts.map(({ id, content}) => (
                <ToastController
                  key={id}
                  content={content}
                  onDismiss={this.onDismiss(id)}
                >
                </ToastController>
              ))}
            </ul>
        , portalTarget)}
      </Provider>
    )
  }
}

export const ToastConsumer = ({ children }: any) => (
  <Consumer>{context => children(context)}</Consumer>
)

export const useToasts = () => {
  const context = useContext(ToastContext);

  return {
    addToast: context.add,
    toasts: context.toasts
  }
}