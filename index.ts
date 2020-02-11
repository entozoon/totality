interface totalityOptions {
  element: HTMLElement;
  currency: string;
}
interface Totality extends totalityOptions {}
class Totality {
  // element: HTMLElement;
  total: number;
  subTotals!: NodeListOf<HTMLElement>;
  observer!: MutationObserver;
  constructor(props: totalityOptions) {
    (<any>Object).assign(this, props);
    // this.element = props.element;
    // this.currency = props.currency;
    this.total = 0;
    const selector = this.element.getAttribute("data-totality");
    if (!selector) {
      return;
    }
    this.subTotals = document.querySelectorAll(selector);

    // Watch for mutations within subTotals on the page and recalculate as necessary
    this.observer = new MutationObserver(this.subscriber);
    this.subTotals.forEach(s => {
      this.observer.observe(s, {
        childList: true,
        subtree: true
      });
    });
    // Initial calculation on page load
    this.update();
  }
  // Utils
  parseMoney = (string: string): number =>
    Number(string.replace(/[^0-9.-]+/g, ""));
  humanMoney = (number: number) =>
    `${this.currency}${(Math.round(number * 100) / 100).toFixed(2)}`;
  // X-men subscription, only $6/mo
  subscriber = (mutationEvents: Array<MutationRecord>) => {
    mutationEvents.forEach(m => {
      this.update();
    });
  };
  update = () => {
    this.calcTotal();
    this.updateTotal(this.total);
  };
  calcTotal = () => {
    if (this.subTotals) {
      // Tot it all up
      this.total = 0;
      this.subTotals.forEach(t => {
        const subTotal = this.parseMoney(t.innerHTML);
        if (subTotal) {
          this.total += subTotal;
        }
      });
    }
    return this.total;
  };
  updateTotal = (total: number) => {
    this.element.innerHTML = this.humanMoney(total);
  };
}
export default Totality;
