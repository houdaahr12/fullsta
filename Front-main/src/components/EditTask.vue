<template>
  <div>
    <!-- Overlay for the popup -->
    <div class="overlay" v-if="show">
      <div class="popup">
        <div class="popup-header">
          <h3>Modifier la tâche</h3>
          <button class="close-btn" @click="closePopup">&times;</button>
        </div>
        <form @submit.prevent="submitEdit">
          <div class="form-group">
            <label for="taskName">Nom de la tâche</label>
            <input
              type="text"
              id="taskName"
              v-model="editedTask.task_name"
              class="form-control"
              required
            />
          </div>

          <div class="form-group">
            <label for="taskCategory">Catégorie</label>
            <select
              id="taskCategory"
              v-model="editedTask.category"
              class="form-control"
              required
            >
              <option value="" disabled selected>Sélectionnez une catégorie</option>
              <option value="étude">Étude</option>
              <option value="travail">Travail</option>
              <option value="loisir">Loisir</option>
              <option value="maison">Maison</option>
              <option value="personnel">Personnel</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div class="form-group">
            <label for="taskPriority">Priorité</label>
            <select
              id="taskPriority"
              v-model="editedTask.priority"
              class="form-control"
              required
            >
              <option value="" disabled selected>Sélectionnez une priorité</option>
              <option value="moins important">Moins important</option>
              <option value="important">Important</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div class="form-group">
            <label for="taskDueDate">Date et Heure</label>
            <input
              type="datetime-local"
              id="taskDueDate"
              v-model="editedTask.due_date"
              class="form-control"
              required
            />
          </div>

          <div class="popup-footer">
            <button type="submit" class="btn btn-primary">Enregistrer</button>
            <button type="button" class="btn btn-secondary" @click="closePopup">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  name: "EditTask",

    task: {
      type: Object,
      required: true,
    },
  
  data() {
    return {
    };
  },
  methods: {
    closePopup() {
      this.$emit("close");
    },
    
    
  },
};
</script>

<style scoped>
/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Popup */
.popup {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.popup-header h3 {
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
}

.form-group {
  margin-bottom: 1rem;
}

.popup-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.popup-footer .btn {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}

.popup-footer .btn-primary {
  background-color: #491784;
  color: white;
  border-radius: 4px;
}

.popup-footer .btn-secondary {
  background-color: #ddd;
  color: black;
  border-radius: 4px;
}
</style>
