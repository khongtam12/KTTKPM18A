package iuh.fit.bai2;

public class TeamMember implements TaskObserver {
    private String name;

    public TeamMember(String name) {
        this.name = name;
    }

    @Override
    public void update(String status) {
        System.out.println(name + " nhận update: Task = " + status);
    }
}