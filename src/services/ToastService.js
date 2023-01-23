export  const  toastShow = (toast, _severity, _summary, _detail, _life = 3000) => {
    toast.current.show({severity:_severity, summary:_summary, detail:_detail, life:_life});
}