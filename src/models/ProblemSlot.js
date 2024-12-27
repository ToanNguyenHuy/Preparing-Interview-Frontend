/**
 * Lớp Model chứa thông tin về các bài có thể được hiển thị
 */
export default class ProblemSlot {
    /**
     * @param {String} title
     * @param {HardLevelEnum} hardLevel
     * @param {ProblemStatusEnum} status
     */
    constructor(title, hardLevel, status) {
        this.title = title;
        this.hardLevel = hardLevel;
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    getTitle() {
        return this.title;
    }

    getHardLevel() {
        return this.hardLevel;
    }
}