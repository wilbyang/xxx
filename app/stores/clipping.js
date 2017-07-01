import {observable, action, useStrict} from 'mobx'
useStrict(true);
export default class Clipping {

  content;

  @observable expanded;

  @action
  toggleOperation() {
    this.expanded = !this.expanded;
  }
}