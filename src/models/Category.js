import {CategoryKey} from "@/constants/category";

/**
 * Lớp xử lý category key từ server để convert về
 * dạng mà client sử dụng và hiển thị
 */
export default class Category {
    constructor(categoryId) {
        this.categoryId = categoryId;
        this.categoryKey = "";
        this.getCategoryKeyFromId();
    }

    getCategoryKeyFromId() {
        let listKey = CategoryKey;
        for (let keyIndex = 0; keyIndex < listKey.length; keyIndex++) {
            if (listKey[keyIndex] === this.categoryId) {
                this.categoryKey = listKey[keyIndex];
                break;
            }
        }
    }

}