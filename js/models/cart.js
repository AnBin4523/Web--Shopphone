function Cart() {
    this.list = [];

    this.themSP = function (product) {
        this.list.push(product);
    }

    this.increaseQuantity = function (id) {
        const index = cart.list.findIndex((item) => item.id === id);
        this.list[index].quantity++;
    }
}