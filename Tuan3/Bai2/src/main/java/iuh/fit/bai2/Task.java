package iuh.fit.bai2;

import java.util.ArrayList;
import java.util.List;

public class Task implements TaskSubject {
    private List<TaskObserver> observers = new ArrayList<>();
    private String status;

    public void setStatus(String status) {
        this.status = status;
        notifyObservers();
    }

    @Override
    public void register(TaskObserver o) {
        observers.add(o);
    }

    @Override
    public void unregister(TaskObserver o) {
        observers.remove(o);
    }

    @Override
    public void notifyObservers() {
        for (TaskObserver o : observers) {
            o.update(status);
        }
    }
}