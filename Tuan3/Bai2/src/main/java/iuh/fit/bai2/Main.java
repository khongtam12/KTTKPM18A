package iuh.fit.bai2;

public class Main {
    public static void main(String[] args) {

        Task task = new Task();


        TeamMember dev = new TeamMember("Developer");
        TeamMember tester = new TeamMember("Tester");
        TeamMember manager = new TeamMember("Manager");


        task.register(dev);
        task.register(tester);
        task.register(manager);


        System.out.println("=== Cập nhật lần 1 ===");
        task.setStatus("Đang thực hiện");

        System.out.println("=== Cập nhật lần 2 ===");
        task.setStatus("Đang kiểm thử");


        task.unregister(tester);

        System.out.println("=== Cập nhật lần 3 ===");
        task.setStatus("Hoàn thành");
    }
}