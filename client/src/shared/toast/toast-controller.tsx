import React, { Component } from "react";

type Props = {
  content: string;
  onDismiss: (id: string) => void;
};

export class ToastController extends Component<Props> {
  componentDidMount() {
    const { onDismiss } = this.props;

    setTimeout(onDismiss, 5000);
  }

  render() {
    const { content } = this.props;

    return <li>{content}</li>;
  }
}
