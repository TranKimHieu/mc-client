<template>
  <div class="el-row">
    <div class="el-col-24 d-flex mt-2 border-round-input">
      <el-col :span="6">
        <button type="button" @click="swicthPage('member')"
                :class="`el-button el-button--warning is-plain ${stateMember ? 'btn-focus' : ''}`">
          <span>Members</span>
        </button>
        <button type="button" @click="swicthPage('team')"
                :class="`el-button el-button--warning is-plain  ${!stateMember ? 'btn-focus' : ''}`">
          <span>Teams</span>
        </button>
      </el-col>
      <el-col :span="3">
        <el-select v-if="stateMember" class="w-100" v-model="value1" placeholder="Category">
          <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
        <el-select v-else class="w-100" v-model="value1" placeholder="Category">
          <el-option
                  v-for="item in categories"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col v-if="stateMember" :span="3" class="ml-2">
        <el-select class="w-100" v-model="value2" multiple collapse-tags placeholder="Teams">
          <el-option
              v-for="item in teams"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" class="ml-2">
        <el-input placeholder="Please input search"></el-input>
      </el-col>
      <el-col :span="3" class="ml-2">
        <button type="button" class="el-button el-button--default is-circle">
          <i class="el-icon-search"></i>
        </button>
      </el-col>
      <el-col :span="stateMember ? 4 : 6">
        <button @click="toggle(stateMember)" type="button" class="el-button el-button--primary is-round float-right">
          <span><i class="el-icon-circle-plus"></i></span>
          <span class="ml-2" v-if="stateMember">Add member</span>
          <span class="ml-2" v-if="!stateMember">Add team</span>
        </button>
      </el-col>
    </div>
    <UserTable :users="userData" v-if="stateMember"></UserTable>
    <TeamTable :teams="teams" v-if="!stateMember"></TeamTable>
<!--member popup -->
    <Popup style="z-index: 20" :visible="isVisiblePopupMember" :title="'Create member'">
      <div slot="body">
        <div>
          <el-form ref="form" :model="formMember" label-width="120px" label-position="left">
            <el-form-item label-width="150px" label="Name">
              <el-input v-model="formMember.name"></el-input>
            </el-form-item>
            <el-form-item label-width="150px" label="Email">
              <el-input type="text" v-model="formMember.email"></el-input>
            </el-form-item>
            <el-form-item label-width="150px" label="Address">
              <el-input type="text" v-model="formMember.address"></el-input>
            </el-form-item>
            <el-form-item label-width="150px" label="Phone">
              <el-input type="text" v-model="formMember.phone"></el-input>
            </el-form-item>
            <el-form-item label-width="150px" label="Role">
              <el-select
                      class="w-100"
                      v-model="formMember.role_id"
                      filterable
                      allow-create
                      default-first-option
                      placeholder="Choose assignee">
                <el-option
                        v-for="role in roles"
                        :key="role.id"
                        :label="role.name"
                        :value="role.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="150px" label="Team">
              <el-select
                      class="w-100"
                      v-model="formMember.team_id"
                      filterable
                      allow-create
                      default-first-option
                      placeholder="Choose type">
                <el-option
                        v-for="team in teams"
                        :key="team.id"
                        :label="team.name"
                        :value="team.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer">
        <el-button :loading="isLoadingBtnSubmit" type="warning" @click="submitCreateMember()">Save</el-button>
        <el-button @click="toggleMemberForm()">Cancel</el-button>
      </div>
    </Popup>
<!--    end member popup-->

<!--    Team popup-->
    <Popup style="z-index: 20" :visible="isVisiblePopupTeam" :title="'Create team'">
      <div slot="body">
        <div>
          <el-form ref="form" :model="formTeam" label-width="120px" label-position="left">
            <el-form-item label-width="150px" label="Name">
              <el-input v-model="formTeam.name"></el-input>
            </el-form-item>
            <el-form-item label-width="150px" label="Description">
              <el-input type="textarea" v-model="formTeam.description"></el-input>
            </el-form-item>
            <el-form-item label-width="150px" label="Category">
              <el-select
                      class="w-100"
                      v-model="formTeam.category_id"
                      filterable
                      allow-create
                      default-first-option
                      placeholder="Choose type">
                <el-option
                        v-for="category in categories"
                        :key="category.id"
                        :label="category.name"
                        :value="category.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer">
        <el-button :loading="isLoadingBtnSubmit" type="warning" @click="submitCreateMTeam()">Save</el-button>
        <el-button @click="toggleTeamForm()">Cancel</el-button>
      </div>
    </Popup>
<!--    end team popup-->
  </div>
</template>

<script>
import UserTable from "@/components/UserTable";
import TeamTable from "@/components/TeamTable";
import {getUserInProject, storeMember} from "../services/userService";
import Popup from "../components/Popup";
import {getTeamInProject, storeTeam} from "../services/teamService";

export default {
  name: "People",
  components: {
    Popup,
    TeamTable,
    UserTable
  },
  data() {
    return {
      stateMember: true,
      options: [{
        value: 'all',
        label: 'All'
      }, {
        value: 'Option2',
        label: 'Option2'
      }, {
        value: 'Option3',
        label: 'Option3'
      }, {
        value: 'Option4',
        label: 'Option4'
      }, {
        value: 'Option5',
        label: 'Option5'
      }],
      value1: [],
      value2: [],
      isVisiblePopupMember: false,
      isVisiblePopupTeam: false,
      formMember: {
        name: '',
        email: '',
        address: '',
        phone: '',
        role_id: '',
        team_id: ''
      },
      formTeam: {
        name: '',
        category_id: '',
        description: '',
        project_id: ''
      },
      userData: [],
      roles: [
        {id: 1, name: 'Manager'},
        {id: 2, name: 'Team leader'},
        {id: 3, name: 'employee'}
      ],
      teams: [],
      isLoadingBtnSubmit: false,
      categories: [
        {id: 1, name: 'Manager'},
        {id: 2, name: 'Contract'},
        {id: 3, name: 'Everyday'}
      ]
    }
  },
  methods: {
    swicthPage(page) {
      switch (page) {
        case 'member' :
          this.stateMember = true
          break;
        case 'team':
          this.stateMember = false
          break;
        default:
          this.stateMember = true

      }
    },
    async submitCreateMember(){
      try {
        this.isLoadingBtnSubmit = true
        await storeMember(this.formMember)
        await this.fetchMembers()
        await this.fetchTeams()
        this.toggleMemberForm()
        this.formTeam = {
          name: '',
          email: '',
          address: '',
          phone: '',
          role_id: '',
          team_id: ''
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoadingBtnSubmit = false
      }
    },
    async submitCreateMTeam(){
      try {
        this.isLoadingBtnSubmit = true
        await storeTeam(
                {
                  ...this.formTeam,
                  ...{
                    project_id: JSON.parse(localStorage.getItem('current-project')).id
                  }
                }
        )
        await this.fetchMembers()
        await this.fetchTeams()
        this.toggleTeamForm()
        this.formMember = {
          name: '',
          category_id: '',
          description: '',
          project_id: ''
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoadingBtnSubmit = false
      }
    },
    toggleMemberForm(){
      this.isVisiblePopupMember = !this.isVisiblePopupMember
    },
    toggleTeamForm(){
      this.isVisiblePopupTeam = !this.isVisiblePopupTeam
    },
    toggle(stateMember){
      if(stateMember){
        this.toggleMemberForm();
      } else {
        this.toggleTeamForm()
      }
    },
    async fetchMembers(){
        const prj = JSON.parse(localStorage.getItem('current-project'));
        const resUsers = await getUserInProject(prj.id)
        this.userData = resUsers.data
    },
    async fetchTeams(){
      const prj = JSON.parse(localStorage.getItem('current-project'));
      const resTeams = await getTeamInProject(prj.id)
      this.teams = resTeams.data
    }
  },
  async created() {
    try {
      this.$bus.emit('change_loading', true)
      await this.fetchMembers()
      await this.fetchTeams()
    } catch (e) {
      console.log(e)
    } finally {
      this.$bus.emit('change_loading', false)
    }
  }
}
</script>

<style scoped>
.btn-focus {
  background-color: #E6A23C !important;
  color: white !important;
}
</style>
