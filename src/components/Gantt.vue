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
    $_customConfigGannt() {
      gantt.templates.task_text = (start,end,task) => {
        return "<b>Text:</b> "+task.text+",<b> Holders:</b> "+task.users;
      }
      gantt.plugins({
        marker: true
      });
      gantt.config.xml_date = "%Y-%m-%d";
    },

     $_initGanttEvents(){
      if (!gantt.$_eventsInitialized) {
        gantt.attachEvent('onTaskSelected', (id) => {
          let task = gantt.getTask(id);
          this.$bus.emit('task-selected', task)
        });

        gantt.attachEvent('onTaskIdChange', (id, new_id) => {
          if (gantt.getSelectedId() === new_id) {
            let task = gantt.getTask(new_id);
            this.$bus.emit('task-selected', task)
          }
        });

        gantt.attachEvent("onBeforeGanttRender", function(){
          var range = gantt.getSubtaskDates();
          var scaleUnit = gantt.getState().scale_unit;
          if(range.start_date && range.end_date){
            gantt.config.start_date = gantt.calculateEndDate(range.start_date, -4, scaleUnit);
            gantt.config.end_date = gantt.calculateEndDate(range.end_date, 5, scaleUnit);
          }
        });

        // eslint-disable-next-line no-unused-vars
        gantt.attachEvent("onAfterTaskAdd", function(id, item){
          gantt.render()
        });

        // eslint-disable-next-line no-unused-vars
        gantt.attachEvent("onAfterTaskUpdate", function(id,item){
          gantt.render()
        });

        gantt.$_eventsInitialized = true;
      }
    },

    $_initDataProcessor() {
      if (!gantt.$_dataProcessorInitialized) {
        gantt.createDataProcessor((entity, action, data, id) => {
          this.$bus.emit(`${entity}-updated`, id, action, data);
        });

        gantt.$_dataProcessorInitialized = true;
      }
    },

    $_createMarker() {
      var todayMarker = gantt.addMarker({
        start_date: new Date(),
        css: "today",
        text: 'Now'
      });
      setInterval(function(){
        var today = gantt.getMarker(todayMarker);
        today.start_date = new Date();
        today.text = 'Now'
        gantt.updateMarker(todayMarker);
        console.log('1')
      }, 1000 * 60);
    }
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
    this.$_customConfigGannt();
    this.$_initGanttEvents();
    this.$_createMarker()
    gantt.init(this.$refs.gantt);
    gantt.parse(this.$props.tasks);
    this.$_initDataProcessor();

  }
}
</script>

<style>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
<style scoped>

</style>
