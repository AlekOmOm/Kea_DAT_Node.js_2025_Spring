<script>
    import Home from "./components/Home/Home.svelte"
    import Parent from "./components/Parent/Parent.svelte"

    const parentNames = ["Adam", "Eva"]
    const children = [
        { name: "Cain", parent: "Adam" },
        { name: "Abel", parent: "Adam" }
    ]

</script>

<Home>

    <Parent name={parentNames[0]} {children} />
    <Parent name={parentNames[1]} {children} />

</Home>
