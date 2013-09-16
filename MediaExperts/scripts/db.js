window.dao =  {

    syncURL: "http://www.birminghamdev1.bham.ac.uk/web_services/MediaExperts.svc/",

    initialize: function(callback) {
        var self = this;
        this.db = window.openDatabase("syncdemodb", "1.0", "Sync Demo DB", 20000000);

        // Testing if the table exists is not needed and is here for logging purpose only. We can invoke createTable
        // no matter what. The 'IF NOT EXISTS' clause will make sure the CREATE statement is issued only if the table
        // does not already exist.
        this.db.transaction(
            function(tx) {
                tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='mediaexperts'", this.txErrorHandler,
                    function(tx, results) {
                        if (results.rows.length == 1) {
                            log('Using existing media experts table in local SQLite database');
                        }
                        else
                        {
                            log('media experts table does not exist in local SQLite database');
                            self.createTable(callback);
                        }
                    });
            }
        )

    },
        
    createTable: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql =
                    "CREATE TABLE IF NOT EXISTS mediaexperts ( " +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "contentId INTEGER, " +
                    "lastModified VARCHAR(50))";
                tx.executeSql(sql);
            },
            this.txErrorHandler,
            function() {
                log('Table mediaexperts successfully CREATED in local SQLite database');
                callback();
            }
        );
    },

    dropTable: function(callback) {
        this.db.transaction(
            function(tx) {
                tx.executeSql('DROP TABLE IF EXISTS mediaexperts');
            },
            this.txErrorHandler,
            function() {
                log('Table mediaexperts successfully DROPPED in local SQLite database');
                callback();
            }
        );
    },

    findAll: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM mediaexperts";
                log('Local SQLite database: "SELECT * FROM mediaexperts"');
                tx.executeSql(sql, this.txErrorHandler,
                    function(tx, results) {
                        var len = results.rows.length,
                            mediaexperts = [],
                            i = 0;
                        for (; i < len; i = i + 1) {
                            mediaexperts[i] = results.rows.item(i);
                        }
                        log(len + ' rows found');
                        callback(mediaexperts);
                    }
                );
            }
        );
    },
    
    find: function(id, callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM mediaexperts where id =" +id;
                log('Local SQLite database: "SELECT * FROM mediaexperts where id = "' + id);
                tx.executeSql(sql, this.txErrorHandler,
                    function(tx, results) {
                        var len = results.rows.length,
                            mediaexperts = [],
                            i = 0;
                        for (; i < len; i = i + 1) {
                            mediaexperts[i] = results.rows.item(i);
                        }
                        log(len + ' rows found');
                        callback(mediaexperts);
                    }
                );
            }
        );
    },

    getLastSync: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT MAX(lastModified) as lastSync FROM mediaexperts";
                tx.executeSql(sql, this.txErrorHandler,
                    function(tx, results) {
                        var lastSync = results.rows.item(0).lastSync;
                        log('Last local timestamp is ' + lastSync);
                        callback(lastSync);
                    }
                );
            }
        );
    },

    sync: function(callback) {

        var self = this;
        log('Starting synchronization...');
        this.getLastSync(function(lastSync){
            self.getChanges(self.syncURL, lastSync,
                function (changes) {
                    if (changes.length > 0) {
                        self.applyChanges(changes, callback);
                    } else {
                        log('Nothing to synchronize');
                        callback();
                    }
                }
            );
        });

    },

    getChanges: function(syncURL, modifiedSince, callback) {

        $.ajax({
            url: syncURL,
            data: {modifiedSince: modifiedSince},
            dataType:"json",
            success:function (data) {
                log("The server returned " + data.length + " changes that occurred after " + modifiedSince);
                callback(data);
            },
            error: function(model, response) {
                alert(response.responseText);
            }
        });

    },

    applyChanges: function(mediaexperts, callback) {
        this.db.transaction(
            function(tx) {
                var l = mediaexperts.length;
                var sql =
                    "INSERT OR REPLACE INTO mediaexperts (contentId) " +
                    "VALUES (?)";
                log('Inserting or Updating in local database:');
                var e;
                for (var i = 0; i < l; i++) {
                    e = mediaexperts[i];
                    log(e.Id);// + ' ' + e.deleted + ' ' + e.lastModified);
                    var params = [e.Id];
                    tx.executeSql(sql, params);
                }
                log('Synchronization complete (' + l + ' items synchronized)');
            },
            this.txErrorHandler,
            function(tx) {
                callback();
            }
        );
    },

    txErrorHandler: function(tx) {
        alert(tx.message);
    }
};

