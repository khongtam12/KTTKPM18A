package iuh.fit.Singleton;

class DatabaseConnection {
    private static DatabaseConnection instance;
    private String connectionName;

    // Constructor private
    private DatabaseConnection() {
        connectionName = "Main Database";
    }

    // Hàm lấy instance duy nhất
    public static DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }

    public void connect() {
        System.out.println("Connected to " + connectionName);
    }
}