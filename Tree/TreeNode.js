function TreeNode (rawNode_, parent_) {

    this.childrenArray = [];
    this.parent = parent_;
    this.rawNode = rawNode_;
    
    this.title = rawNode_.HistoryItem.title;
    this.url = rawNode_.HistoryItem.url;
    this.id = rawNode_.VisitItem.visitId;

    this.equals = function (treeNode) {
        return this.id === treeNode.id;
    }

}
