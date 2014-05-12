function TreeNode (rawNode_, parent_) {

    this.childrenArray = [];
    this.parent = parent_;
    this.rawNode = rawNode_;

    this.title = rawNode_.HistoryItem.title;
    this.url = rawNode_.HistoryItem.url;
    this.id = rawNode_.VisitItem.visitId;

    this.equals = function (treeNode) {
        return this.id === treeNode.id;
    };

    this.getTime = function() {

      floorTime = Math.floor( this.rawNode.VisitItem.visitTime );
      sec = (floorTime - floorTime % 1000) / 1000;
      var date = new Date(0);
      date.setUTCSeconds(sec);

      hours = date.getHours().toString();
      minutes = date.getMinutes().toString();
      seconds = date.getSeconds().toString();

      if(minutes.length == 1) {
        minutes = "0" + minutes;
      }

      if(seconds.length == 1) {
        seconds = "0" + seconds;
      }

      return hours + ":" + minutes + ":" + seconds;
    }
}

//function TreeNode (parent, title, url, id) {
//    this.childrenArray = [];
//    this.parent = parent;
//    this.title = title;
//    this.url = url;
//    this.id = id;
//
//    this.equals = function (treeNode) {
//        return this.id === treeNode.id;
//    }
//}
