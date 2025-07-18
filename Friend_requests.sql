
CREATE TABLE IF NOT EXISTS Friend_requests(
    sender VARCHAR(255),
    receiver VARCHAR(255),
    PRIMARY KEY (sender, receiver),
    FOREIGN KEY (sender) REFERENCES Banana_data(username) ON DELETE CASCADE,
    FOREIGN KEY (receiver) REFERENCES Banana_data(username) ON DELETE CASCADE

)