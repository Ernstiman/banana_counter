
CREATE TABLE IF NOT EXISTS Followers(
    follower VARCHAR(255),
    followed VARCHAR(255),
    PRIMARY KEY (follower, followed),
    FOREIGN KEY (follower) REFERENCES Banana_data(username) ON DELETE CASCADE,
    FOREIGN KEY (followed) REFERENCES Banana_data(username) ON DELETE CASCADE
);