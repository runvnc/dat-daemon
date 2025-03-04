```
enum Subject {
  LIST = 0;
  ITEM = 1;
}

message Dat {
  required string key = 1;
  required string path = 2;
}

message List {
  repeated Dat list = 1;
}

message Instruction {
  enum Action {
    // List
    ADD = 0;
    REMOVE = 1;
    GET = 2;
    // Item
    START = 3;
    PAUSE = 4;
    LOAD = 5;
    WATCH = 6;
    MKDIR = 7;
    READDIR = 8;
    UNLINK = 9;
    RMDIR = 10;
    INFO = 11;
    STAT = 12;
    // FS
    // WRITE = 12;
    // READ = 13;
  }

  required int32 id = 1;
  required Action action = 2;
  required Subject subject = 3;
  optional string key = 4;
  optional string path = 5;
}

message Statistics {
  required int64 files = 1;
  required int64 connected = 2;
  required int64 byteLength = 3;
  required int64 version = 4;
  required float downloadSpeed = 5;
  required float uploadSpeed = 6;
  required float totalPeers = 7;
  required float completePeers = 8;
  required float downloadTotal = 9;
  required float uploadTotal = 10;
}

// https://github.com/mafintosh/hyperdrive/blob/master/schema.proto
message Stat {
  required uint32 mode = 1;
  optional uint32 uid = 2;
  optional uint32 gid = 3;
  optional uint64 size = 4;
  optional uint64 blocks = 5;
  optional uint64 offset = 6;
  optional uint64 byteOffset = 7;
  optional uint64 mtime = 8;
  optional uint64 ctime = 9;
}

message Answer {
  required int32 id = 1;
  optional int32 failure = 2 [default = 0];
  optional string message = 3;
  optional Statistics statistics = 4;
  repeated Dat list = 5;
  repeated string files = 6;
  optional string key = 7;
  optional Stat stat = 8;
}
```
