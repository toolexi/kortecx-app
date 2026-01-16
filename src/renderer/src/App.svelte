<script lang="ts">
  import axios from 'axios';
  import kortecxLogo from './assets/kortecx.png';

  let data = $state<string>('Response');

  async function checkHealth() {
    const response = await axios.get('/kortecx');
    data = response.data.message;
  }
</script>

<img alt="logo" class="logo" src={kortecxLogo} />

<div class="creator">Kortecx - Executable Intelligence Platform</div>

<div class="text">
  Unlimited AI possibilities with exceptional performance powered by
  <span class="svelte">KortecxDB</span>
  and
  <span class="ts">KortecxCLI</span>
</div>

<div>
  <button class="btn" onclick={checkHealth}>
    Check API Health
  </button>

  <div>{data}</div>
</div>
