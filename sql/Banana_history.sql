
CREATE TABLE IF NOT EXISTS Banana_history(
    amount INT,
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    caption TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES Banana_data(username) ON DELETE CASCADE
)