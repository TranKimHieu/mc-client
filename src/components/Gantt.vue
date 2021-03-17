<template>
  <div ref="gantt"></div>
</template>

<script>
import 'dhtmlx-gantt'
export default {
  name: 'Gantt',
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    },
    unit: null
  },

  methods: {
     $_initGanttEvents(){
      if (!gantt.$_eventsInitialized) {
        gantt.attachEvent('onTaskSelected', (id) => {
          // eslint-disable-next-line no-undef
          let task = gantt.getTask(id);

          this.$emit('task-selected', task);
        });

        gantt.attachEvent('onTaskIdChange', (id, new_id) => {
          // eslint-disable-next-line no-undef
          if (gantt.getSelectedId() == new_id) {
            // eslint-disable-next-line no-undef
            let task = gantt.getTask(new_id);
            this.$emit('task-selected', task);
          }
        });
        // eslint-disable-next-line no-undef
        gantt.$_eventsInitialized = true;
      }
    },

    $_initDataProcessor() {
      if (!gantt.$_dataProcessorInitialized) {
        gantt.createDataProcessor((entity, action, data, id) => {
          this.$emit(`${entity}-updated`, id, action, data);
        });

        gantt.$_dataProcessorInitialized = true;
      }
    },

    $_configGannt() {
      gantt.templates.task_text = (start,end,task) => {
        return "<b>Text:</b> "+task.text+",<b> Holders:</b> "+task.users;
      }
    },
  },

  watch: {
    unit: function (unit){
      let format = "%j, %D"
      switch (unit) {
        case 'month':
          format = "%F, %Y"
          break;
        case 'day':
          format = "%j, %D"
          break;
      }
      gantt.config.scales = [
        {unit: unit, step: 1, format: format},
      ];
      gantt.render();
    }
  },

  mounted: function () {
    this.$_configGannt();
    this.$_initGanttEvents();
    gantt.config.xml_date = "%Y-%m-%d";

    gantt.init(this.$refs.gantt);

    gantt.parse(this.$props.tasks);

    this.$_initDataProcessor();
  }
}
</script>

<style>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
