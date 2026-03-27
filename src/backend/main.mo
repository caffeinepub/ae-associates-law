import Int "mo:core/Int";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    matterDescription : Text;
    timestamp : Time.Time;
  };

  module ContactSubmission {
    public func compare(submission1 : ContactSubmission, submission2 : ContactSubmission) : Order.Order {
      Int.compare(submission2.timestamp, submission1.timestamp);
    };
  };

  let submissions = Map.empty<Time.Time, ContactSubmission>();
  var nextKey = 0;

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, matterDescription : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      phone;
      matterDescription;
      timestamp = Time.now();
    };
    let key = Time.now() * 1000000 + nextKey;
    submissions.add(key, submission);
    nextKey += 1;
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactSubmission] {
    submissions.values().toArray().sort();
  };
};
