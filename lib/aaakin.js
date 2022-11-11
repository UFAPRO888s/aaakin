'use babel';

import AaakinView from './aaakin-view';
import { CompositeDisposable } from 'atom';

export default {

  aaakinView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.aaakinView = new AaakinView(state.aaakinViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.aaakinView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'aaakin:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.aaakinView.destroy();
  },

  serialize() {
    return {
      aaakinViewState: this.aaakinView.serialize()
    };
  },

  toggle() {
    console.log('Aaakin was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
