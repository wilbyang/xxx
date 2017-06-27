import {observable, action, useStrict} from 'mobx'
useStrict(true);
export default class ClippingListItem {
  @observable
  content;
  @observable
  expanded;

  @action
  toggleOperation() {
    this.expanded = !this.expanded;
  }
}