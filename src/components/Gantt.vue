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
    }
  },

  methods: {
    $_initGanttEvents: function() {
      // eslint-disable-next-line no-undef
      if (!gantt.$_eventsInitialized) {
        // eslint-disable-next-line no-undef
        gantt.attachEvent('onTaskSelected', (id) => {
          // eslint-disable-next-line no-undef
          let task = gantt.getTask(id);
          this.$emit('task-selected', task);
        });

        // eslint-disable-next-line no-undef
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

    $_initDataProcessor: function() {
      // eslint-disable-next-line no-undef
      if (!gantt.$_dataProcessorInitialized) {
        // eslint-disable-next-line no-undef
        gantt.createDataProcessor((entity, action, data, id) => {
          this.$emit(`${entity}-updated`, id, action, data);
        });

        // eslint-disable-next-line no-undef
        gantt.$_dataProcessorInitialized = true;
      }
    }
  },

  mounted: function () {
    this.$_initGanttEvents();
    // eslint-disable-next-line no-undef
    gantt.config.xml_date = "%Y-%m-%d";

    // eslint-disable-next-line no-undef
    gantt.init(this.$refs.gantt);
    // eslint-disable-next-line no-undef
    gantt.parse(this.$props.tasks);

    this.$_initDataProcessor();
  }
}
</script>

<style>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
