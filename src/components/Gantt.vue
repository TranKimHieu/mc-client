<template>
  <div ref="gantt"></div>
</template>

<script>
import 'dhtmlx-gantt'
// eslint-disable-next-line no-unused-vars
import {storeTask} from "../services/taskService";
export default {
  name: 'Gantt',
  data(){
    return {
      configLeft: {
        pos: "left",
        view: "grid",
        scrollX:"scrollHor",
        scrollY:"scrollVer"
      },
    }
  },
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    },
    unit: null,
    removeLeft: null
  },

  methods: {
    $_customConfigGannt() {
      gantt.templates.task_text = (start,end,task) => {
        return "<b>Title:</b> "+task.text+",<b> Assignee:</b> "+task.assignee_obj.name;
      }
      gantt.plugins({
        marker: true
      });
      gantt.config.xml_date = "%Y-%m-%d";

      gantt.config.layout = {
        css: "gantt_container",
        rows:[
          {
            cols: [
              this.configLeft,
              {
                pos: "center",
                view: "timeline",
                scrollX:"scrollHor",
                scrollY:"scrollVer"
              },
              {
                view: "scrollbar",
                id:"scrollVer"
              },
            ]},
          {
            view: "scrollbar",
            id:"scrollHor"
          },
        ]
      }

      // gantt.config.lightbox.sections = [
      //   {name: "type", type: "typeselect", map_to: "type"},
      //   {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
      //   {name:"assignee", height:22, map_to:"assignee", type:"select", options: [
      //       {key:1, label: "Hieutk1"},
      //       {key:2, label: "Hieutk2"},
      //       {key:3, label: "Hieutk3"}
      //     ]},
      //   {name:"time", height:72, type:"duration", map_to:"auto"}
      // ];
      gantt.locale.labels.section_assignee = "Assignee";

      gantt.attachEvent("onGanttReady", function(){
        gantt.config.buttons_left = ["gantt_save_btn", "gantt_cancel_btn","complete_button"];
        gantt.config.buttons_right = ["gantt_delete_btn"];
        gantt.locale.labels["complete_button"] = "";
        gantt.locale.labels.gantt_save_btn = "Save";
        gantt.locale.labels.gantt_cancel_btn = "Cancel";
        gantt.locale.labels.gantt_delete_btn = "Delete";
      });
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
        // gantt.attachEvent("onAfterTaskAdd", function(id, item){
        //   gantt.render()
        // });

        gantt.attachEvent("onLightbox", function (task_id){
          console.log(['----', task_id])
        });

        // gantt.attachEvent("onBeforeLightbox", function (){
        //   gantt.resetLightbox();
        //   // var task = gantt.getTask(task_id);
        //   // if (task.restricted ==true){
        //   //   gantt.config.lightbox.sections = restricted_lightbox;
        //   // } else {
        //   //   gantt.config.lightbox.sections = full_lightbox;
        //   // };
        //   return true;
        // });
        // eslint-disable-next-line no-unused-vars
        gantt.attachEvent("onBeforeLightbox", function (id){
          //any custom logic here
          return false;
        });

        // eslint-disable-next-line no-unused-vars
        gantt.attachEvent("onAfterLightbox", function (id){
          //any custom logic here
          return false;
        });


        // gantt.attachEvent("onBeforeLightbox", function(id, item) {
        //
        //   // return true;
        // });

        // eslint-disable-next-line no-unused-vars
        gantt.attachEvent("onBeforeTaskAdd", async (id, task) => {
        })

        // eslint-disable-next-line no-unused-vars
        gantt.attachEvent("onAfterTaskUpdate", function(id,item){
          gantt.render()
        });

        // gantt.attachEvent("onLightboxButton", function(button_id, node, e){
        //   console.log(button_id)
        //   if(button_id === "complete_button"){
        //     console.log([node, e])
        //     // var id = gantt.getState().lightbox;
        //     // gantt.getTask(id).progress = 1;
        //     // gantt.updateTask(id);
        //     // gantt.hideLightbox();
        //   }
        // });


        gantt.attachEvent("onTaskCreated", (task) => {
          this.$bus.emit('task-created', task.parent)
          return false
        });

        gantt.$_eventsInitialized = true;
      }
    },

    $_initDataProcessor() {
      if (!gantt.$_dataProcessorInitialized) {
        gantt.createDataProcessor((entity, action, data, id) => {
          this.$bus.emit(`${entity}-updated`, id, action, data);
          // if(action === 'create') {
          //   this.$bus.emit('task-created', data)
          // }
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
    },
    removeLeft: function () {
      // this.$bus.on('toggle-left-gantt', function () {
        if(gantt.config.layout.rows[0].cols[0].pos === "left"){
          gantt.config.layout.rows[0].cols.shift()
        }else{
          gantt.config.layout.rows[0].cols.unshift(this.configLeft)
        }
        gantt.init(this.$refs.gantt);
      // }.bind(this))
    }
  },

  mounted: function () {
    this.$_customConfigGannt();
    this.$_initGanttEvents();
    this.$_createMarker()
    gantt.init(this.$refs.gantt);
    gantt.parse(this.$props.tasks);
    this.$_initDataProcessor();
  },

  created() {
    let that = this
    this.$bus.on('reload', function () {
      gantt.init(that.$refs.gantt);
      gantt.parse(that.$props.tasks);
    })
  }
}
</script>

<style>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
<style scoped>

</style>
